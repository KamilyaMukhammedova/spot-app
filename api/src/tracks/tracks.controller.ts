import { Body, Controller, Get, Post } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';

@Controller('tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  create(@Body() trackData: CreateTrackDto) {
    console.log(trackData);
    return this.tracksService.create({
      name: trackData.name,
      artist: trackData.artist,
      text: trackData.text,
    });
  }

  @Get()
  getAll() {
    return this.tracksService.getAll();
  }
}
