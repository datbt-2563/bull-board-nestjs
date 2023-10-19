import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('my_awesome_queue')
export class FeatureProcessor {
  @Process()
  async handle(job: Job<unknown>) {
    const { data } = job;
    console.log(`Handling job at my_awesome_queue: ` + data['time']);

    // sleep 10s
    await new Promise((resolve) => setTimeout(resolve, 10000));
    console.log(`=== Finish awesome_queue: ` + data['time']);
  }
}
