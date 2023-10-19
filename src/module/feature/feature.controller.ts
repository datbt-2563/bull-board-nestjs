import { InjectQueue } from '@nestjs/bull';
import { Controller, Get } from '@nestjs/common';
import { Queue } from 'bull';

@Controller()
export class FeatureController {
  constructor(@InjectQueue('my_awesome_queue') private myAwesomeQueue: Queue) {}

  @Get('push')
  push() {
    const d = new Date();
    console.log('push jobs to queues');
    const randomStr = (Math.random() + 1).toString(36).substring(7);
    return this.myAwesomeQueue.add({
      foo: 'bar',
      time: `${d.getHours()} : ${d.getMinutes()} - ${randomStr}`,
    });
  }

  @Get('activity')
  async analyzeFrequencyOfQueue() {
    const listCompletedJobs = await this.myAwesomeQueue.getCompleted();
    const handleTimeOfJobs = listCompletedJobs.map((m) => {
      return {
        id: +m.id,
        finishedOn: m.finishedOn,
        processedOn: m.processedOn,
      };
    });
    console.log(handleTimeOfJobs);
    // sort asc by time
    handleTimeOfJobs.reverse();

    const freeTimeInMs: number[] = [];
    for (let i = 0; i < handleTimeOfJobs.length; i++) {
      if (handleTimeOfJobs[i + 1]) {
        freeTimeInMs.push(
          handleTimeOfJobs[i + 1].processedOn - handleTimeOfJobs[i].finishedOn,
        );
      } else {
        const now = new Date().getTime();
        freeTimeInMs.push(now - handleTimeOfJobs[i].finishedOn);
      }
    }
    console.log(freeTimeInMs);
  }
}
