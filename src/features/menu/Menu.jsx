import { useLoaderData } from 'react-router-dom';
import MenuItem from './MenuItem';

function Menu() {
  const menu = useLoaderData();
  return (
    <ul className="px-4 divide-y divide-stone-200">
      {menu.map((pizza) => (
        <MenuItem
          pizza={pizza}
          key={pizza.id}
        />
      ))}
    </ul>
  );
}

export default Menu;
