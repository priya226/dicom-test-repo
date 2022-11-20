export interface ITool {
    name: string;
    options: any;
    mode: ToolModeEnum;
    state?: any;
  }
  
  export enum ToolModeEnum {
    Active = 'Active',
    Passive = 'Passive',
    Enabled = 'Enabled',
    Disabled  = 'Disabled'
  }