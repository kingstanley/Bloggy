import { Tag } from './entity/tag.entity';
import { User } from './../user/user.entity';
import { AuthCredentialsDto } from './../user/dto/auth-credentials.dto';
import { PostDto } from './dto/post.dto';
import { EntityRepository, Repository } from 'typeorm';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Posts } from './entity/post.entity';

@EntityRepository(Posts)
export class PostsRepository extends Repository<Posts> {
  async findByTitle(title: string): Promise<Posts> {
    const found = await this.findOne({ where: { title } });
    if (!found) {
      throw new NotFoundException(`Could not found Posts with Title: ${title}`);
    }

    return found;
  }

  async findById(id: string): Promise<Posts> {
    const query = this.createQueryBuilder('post');
    const found =  query.whereInIds(id).getOne();
    // const found = await this.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(
        `Could not found Posts with the specifield id`,
      );
    }

    return found;
  }

  async createPosts(postDto: PostDto, user: User): Promise<Posts> {

    const { tags, title, content, allowComments, status } = postDto;
    try {console.log('dto: ', postDto);
         const slug = title.replace(/ /g, '-'); // replacing space with hyphen
         console.log('Tags: ', tags);
         const post = await Posts.create({
        title,
        content,
        slug,
        allowComments,
        status,
        user,
      });
         const tagsToSave = [];
         console.log('Tag length: ', tags.length);
      for (let i = 0; i < tags.length; i++) {
        // console.log('Tag at: ', i, ' is: ', tags[i]);
        let tagg = await Tag.findOne({ tag: tags[i].tag });
        console.log('found tag :', tagg);
        // tslint:disable-next-line: align
        if (!tagg) {
          // is a new tag. Save to tag
          tagg = await Tag.create(tags[i]).save();
          tagsToSave.push(tagg);
        } else {
          tagsToSave.push(tagg);
        }
      }
         post.tags = tagsToSave;

         post.user = user;
         await post.save();
         return post;
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(
        'Sorry, We could not save your Posts. Try Again: ' + error.message,
      );
    }
  }
}
