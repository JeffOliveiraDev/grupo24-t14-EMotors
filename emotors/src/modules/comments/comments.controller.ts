import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Delete,
  Request,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from '../auth/jwt-guard.auth';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':announcementId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Request() req,
    @Param('announcementId') announcementId: string,
  ) {
    return this.commentsService.create(
      createCommentDto,
      req.user.id,
      announcementId,
    );
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findAll(@Query() query) {
    return this.commentsService.findAll(query);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Request() req,
  ) {
    return this.commentsService.update(id, updateCommentDto, req.user.id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Request() req) {
    return this.commentsService.remove(id, req.user.id);
  }
}
