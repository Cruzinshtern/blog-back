import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { PostEntity } from "./models/post.entity";
import { Repository } from "typeorm";
import { from, Observable } from "rxjs";

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>
  ) {}

  create(post: PostEntity): Observable<PostEntity> {
    const newPost = new PostEntity();
    newPost.id = post.id;
    newPost.author = post.author;
    newPost.title = post.title;
    newPost.text = post.text;
    return from(this.postRepository.save(newPost));
  }

  findOne(id: string): Observable<PostEntity> {
    return from(this.postRepository.findOne(id));
  }

  findAll(): Observable<PostEntity[]> {
    return from(this.postRepository.find());
  }

  updateOne(id: string, post: PostEntity): Observable<any> {
    return from(this.postRepository.update(id, post));
  }

  deleteOne(id: string): Observable<any> {
    return from(this.postRepository.delete(id));
  }
}
