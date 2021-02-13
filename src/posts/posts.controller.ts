import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostEntity } from "./models/post.entity";
import { Observable } from "rxjs";

@Controller('posts')
export class PostsController {

  constructor(
    private postService: PostsService
  ) {}

  @Post()
  createPost(@Body() post: PostEntity): Observable<PostEntity> {
    return this.postService.create(post);
  }

  @Get(':id')
  findOnePost(@Param('id') id: string): Observable<PostEntity> {
    return this.postService.findOne(id);
  }

  @Get()
  findAllPosts(): Observable<PostEntity[]> {
    return this.postService.findAll();
  }

  @Put(':id')
  updatePost(@Param('id') id: string, @Body() post: PostEntity): Observable<any> {
    return this.postService.updateOne(id, post);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string): Observable<any> {
    return this.postService.deleteOne(id);
  }
}
