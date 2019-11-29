import { NotificationService } from './../notification/notification/notification.service';
import { MailerModule, MailerService } from '@nest-modules/mailer';
import { Like } from './entity/like.entity';
import { Comment } from './entity/comment.entity';
import { CommentDto } from './dto/comment.dto';
import { Tag } from './entity/tag.entity';
import { User } from './../user/user.entity';
import { AuthCredentialsDto } from './../user/dto/auth-credentials.dto';
import { PostDto } from './dto/post.dto';
import {
  EntityRepository,
  Repository,
  createQueryBuilder,
  getRepository,
} from 'typeorm';
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
    try {
      const query = this.createQueryBuilder('post');
      const found = await this.findOne({
        where: { id },
        relations: ['user', 'likes', 'tags', 'comments'],
      });
      if (found.user) {
        delete found.user.password;
        delete found.user.salt;
      }

      const comments = [];
      for (const u of found.comments) {
        delete u.user.salt;
        delete u.user.password;
        comments.push(u);
      }
      found.comments = comments.sort((createdAt, commentId) => -1);
      if (!found) {
        throw new NotFoundException(
          `Could not found Posts with the specifield id`,
        );
      }

      return found;
    } catch (ex) {
      throw new InternalServerErrorException(ex.message);
    }
  }

  async findAllByAuthorId(authorId: string): Promise<Posts[]> {
    const query = this.createQueryBuilder('post');
    const found = await this.find({
      where: { userId: authorId },
      relations: ['user', 'likes', 'tags'],
    });
    console.log("Posts by author: ", found.length);
    if (found) {
      return found;
    } else {
      throw new NotFoundException(
        'The author currently have no published post'
      );
    }
  }
  async my(user: User): Promise<Posts[]> {
    try {
      const posts = await this.find({ userId: user.id });
      // posts.sort('status')
      return posts;
    } catch (ex) {
      console.log('Error: ', ex);
      throw new InternalServerErrorException(ex.message);
    }
  }
  async comment(commentDto: CommentDto, user: User): Promise<Comment> {
    console.log('comment dto: ', commentDto);
    const post = await this.findById(commentDto.postId);
    console.log('post found: ', post);
    if (!post) {
      throw new NotFoundException('The specifield post does not exist!');
    }
    const comment = await Comment.create({
      postId: commentDto.postId,
      content: commentDto.comment,
      user,
    }).save();
    if (!comment) {
      throw new InternalServerErrorException(
        'Sorry, We could not save your comment. Try Again'
      );
    }
    console.log('Comments: ', comment);
    return comment;
  }

  // Find all post with its tags, comments and likes
  async findAll(searchText?: string): Promise<Posts[]> {
    try {
      const query = createQueryBuilder<Posts>('post');
      let posts;

      if (searchText)  {
        // console.log("Search Text: ", searchText);
        posts = await query
          .orWhere('Posts.title like :title', { title: '%' + searchText + '%' })
          // .orWhere('Posts.user.username = :username', { username: searchText })
          .leftJoinAndSelect('Posts.user', 'user')
          .leftJoinAndSelect('Posts.tags', 'tags')
          .leftJoinAndSelect('Posts.likes', 'likes')
          .getMany();
      } else {
        posts = await this.find({
          relations: ['user', 'likes', 'tags'],
        });

        // console.log("Published posts", posts);
      }

      for (let i = 0; i < posts.length; i++) {
        delete posts[i].user.password;
        delete posts[i].user.salt;
        delete posts[i].user.comments;
      }

      // const tags = await Tag.find();

      // Notify subscribers
      // this.notification.newPostNotify();
      return posts;
    } catch (error) {
      console.log('Error: ', error);
      throw new InternalServerErrorException('Error:', error.message);
    }
  }

  // This method will be used to handle both creating new and updating existing post
  async createPosts(postDto: PostDto, user: User): Promise<Posts> {
    const {
      tags,
      title,
      content,
      allowComments,
      status,
      id,
      videoUrl,
    } = postDto;
    try {
      // console.log("User in repository: ", user);
      const slug = title.replace(/ /g, '-'); // replacing space with hyphen

      // Delete old tags
      const query = createQueryBuilder();
      const oldTags = await query.connection.query(
        `Delete  FROM post_tags_tag WHERE postId = '${id}'`,
      );
      // oldTags.remove();
      // console.log('Old tags: ', oldTags);

      const tagsToSave = [];

      for (let i = 0; i < tags.length; i++) {
        // console.log('Tag at: ', i, ' is: ', tags[i]);
        let tagg = await Tag.findOne({ tag: tags[i].tag });

        // tslint:disable-next-line: align
        if (!tagg) {
          // is a new tag. Save to tag
          tagg = await Tag.create(tags[i]).save();
          tagsToSave.push(tagg);
        } else {
          tagsToSave.push(tagg);
        }
      }

      // check if post already exist
      let post = await this.findOne(id);
      if (!post) {
        post = new Posts();
      }
      // console.log('Tag to save: ', tagsToSave);

      post.title = title;
      post.allowComments = allowComments;
      post.slug = slug;
      post.status = status;
      post.content = content;
      post.videoUrl = videoUrl;

      post.tags = tagsToSave;
      post.userId = user.id;
      await post.save();
      return post;
    } catch (error) {
      // console.log(error);
      throw new InternalServerErrorException(
        'Sorry, We could not save your Posts. Try Again: ' +
          error.message.message,
      );
    }
  }

  async allTags(): Promise<Tag[]> {
    try {
      const query = createQueryBuilder<Tag>(Tag);
      const tags = await query.getMany();
      // console.log('Tags: ', tags)
      return tags;
    } catch (ex) {
      // console.log("Error: ", ex);
      throw new InternalServerErrorException('Error loading tags');
    }
  }
  async findTags(tag: string): Promise<Tag[]> {
    const query = createQueryBuilder<Tag>(Tag);
    const tags = await query
      .where('tag.tag like :tag', { tag: '%' + tag + '%' })
      .getMany();
    return tags;
  }
  async findAllPostWithTag(tag: string): Promise<Posts[]> {
    const foundTag = await Tag.findOne({tag}, { relations: ['posts'] });
    
    if (foundTag) {
      
     const posts = await foundTag.posts;

     const postsToReturn = [];

     for (const item of posts) {
      const post = await Posts.findOne(item.id, {
        relations: ['user', 'tags'],
      });
      postsToReturn.push(post);
    }
     return postsToReturn;
   }
  }
}
