import Link from 'next/link';
import { getUserProfile } from 'services/user';
import { useUI } from '../components/ui/context';

export default function Home() {
  const { openModal, setModalView } = useUI();

  const handleClick = () => {
    openModal();
    setModalView('LOGIN_VIEW');
  }
  const getProfile =() => {
    getUserProfile();
  }
  return (
    <div>
      <button
        onClick={handleClick}
      >login</button>
      <button onClick={getProfile}>profile</button>
    </div>
  )
}
