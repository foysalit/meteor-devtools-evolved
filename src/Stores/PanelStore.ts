import { action, observable } from 'mobx';
import { debounce } from 'lodash';

export class PanelStoreConstructor {
  @observable ddpCount: number = 0;
  @observable ddp: DDPLog[] = [];
  @observable newDdpLogs: number[] = [];
  @observable activeLog: DDPLog | null = null;

  @action
  pushLog(log: DDPLog) {
    if (log.timestamp) {
      this.newDdpLogs.push(log.timestamp);
    }

    this.ddp.push(log);

    // Maximum number of items.
    if (this.ddpCount + 1 > 1000) {
      this.ddp.shift();
    } else {
      ++this.ddpCount;
    }

    this.clearNewLogs();
  }

  clearNewLogs = debounce(
    action(() => {
      this.newDdpLogs = [];
    }),
    1000,
  );

  @action
  clearLogs() {
    this.ddp = [];
    this.ddpCount = 0;
  }

  @action
  setActiveLog(log: DDPLog | null) {
    this.activeLog = log;
  }
}

export const PanelStore = new PanelStoreConstructor();
