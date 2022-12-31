import { FC, useState } from "react";
import s from "./Option.module.css";
interface OptionSideBarProps {
  className?: string;
  children?: any;
  el?: HTMLElement;
  clean?: boolean;
  onClick: () => void;
  typeOfOption: string;
  data: any;
  view: string;
}

const OptionSideBar: FC<OptionSideBarProps> = ({
  typeOfOption,
  data,
  view,
}) => {
  const [isShow, setIsShow] = useState(false);

  const toggleShow = () => {
    setIsShow(!isShow);
  };

  return (
    <div className="relative inline-block w-full">
      <div className="lg:hidden">
        <span className="rounded-md shadow-sm">
          <button onClick={toggleShow} className={s.button}>
            {`${view}`}
          </button>
        </span>
      </div>
      {isShow && (
        <div className={s.list}>
          <span className="hidden lg:block font-bold">Sắp xếp theo</span>
          <ul>
            {data.map((c: any, i: any) => {
              return (
                <li key={i} className={s.listItem}>
                  <a
                    className="px-4 capitalize"
                    href={`/search/category/${c.name}`}
                  >
                    {c.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OptionSideBar;
