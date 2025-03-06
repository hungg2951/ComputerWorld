import { Link } from "react-router-dom";

export const convertToAntdMenuItems = (items)=> {
    return items.map((item) => {
      if (item.children) {
        return {
          key: item.key,
          label: item.label,
          icon: item.icon,
          children: convertToAntdMenuItems(item.children),
        };
      }
      return {
        key: item.key,
        label: <Link to={item.path || "#"}>{item.label}</Link>,
        icon: item.icon,
      };
    });
  };