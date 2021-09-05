export interface IMenu {
  /** 用戶id */
  User: number;
  _last_modified: string;
  /** 動作列表 */
  actions: any[];
   /** 菜單id */
  menu_id: number;
  /** 菜單標題 */
  name: string;
  /** 訓練時間 */
  // TODO:是訓練還是創立課表的時間
  plan_time: string;
}
