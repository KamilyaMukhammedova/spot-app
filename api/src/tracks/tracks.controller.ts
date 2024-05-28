import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';
import { CreateTrackDto } from './dto/create-track.dto';
import { TracksService } from './tracks.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  create(@UploadedFiles() files, @Body() trackData: CreateTrackDto) {
    const { audio, picture } = files;
    return this.tracksService.create(
      {
        name: trackData.name,
        artist: trackData.artist,
        text: trackData.text,
      },
      audio[0],
      picture[0],
    );
  }

  @Get()
  getAll() {
    return this.tracksService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.tracksService.getOne(id);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: ObjectId) {
    return this.tracksService.deleteOne(id);
  }

  @Post('/comment')
  addComment(@Body() commentData: CreateCommentDto) {
    return this.tracksService.addComment({
      username: commentData.username,
      text: commentData.text,
      trackId: commentData.trackId,
    });
  }
}
