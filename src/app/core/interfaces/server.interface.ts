export interface IMenu {
  /** 用戶id */
  User: number;
  _last_modified: string;
  /** 動作列表 */
  actions: IAction[];
  /** 菜單id */
  menu_id: number;
  /** 菜單標題 */
  name: string;
  /** 訓練時間 */
  // TODO:是訓練還是創立課表的時間
  plan_time: string;
}

export interface  IAction {
  /** menuid */
  menu_id: number;
  _last_modified: string;
  action_id: number;
  /** 動作名稱 */
  content: string;
  records: any[];
}
