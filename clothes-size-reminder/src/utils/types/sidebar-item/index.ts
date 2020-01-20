interface ISidebarItem {
    title: string;
    icon: string;
    pathName: string;
    isExpanded?: boolean;
    child?: ISidebarItem[];
}

export default ISidebarItem;
