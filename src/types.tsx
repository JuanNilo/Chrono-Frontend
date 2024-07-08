export type SideNaviItem = {
    title: string,
    path: string,
    icon?: JSX.Element;
    subMenuItems?: SideNaviItem[];
};