import CanUseDOM from '@//:modules/utilities/CanUseDOM';

let RootElement = null;

if (CanUseDOM) {
  RootElement = document.createElement('div');
  document.body.appendChild(RootElement);
}

export default RootElement;
