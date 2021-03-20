import CanUseDOM from '@//:modules/utilities/CanUseDOM';

let RootElement = null;

if (CanUseDOM) {
  RootElement = document.getElementById('root');
}

export default RootElement;
