import { Module } from '@nestjs/common';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { BullModule } from '@nestjs/bull';
import { BullBoardModule } from '@bull-board/nestjs';
import { FeatureProcessor } from './feature.processor';
import { FeatureController } from './feature.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'my_awesome_queue',
    }),
    BullBoardModule.forFeature({
      name: 'my_awesome_queue',
      adapter: BullAdapter, //or use BullAdapter if you're using bull instead of bullMQ
    }),
  ],
  controllers: [FeatureController],
  providers: [FeatureProcessor],
})
export class FeatureModule {}
