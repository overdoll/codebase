/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LockedAccountBannerFragment = {
    readonly " $fragmentRefs": FragmentRefs<"LockedAccountModalFragment">;
    readonly " $refType": "LockedAccountBannerFragment";
};
export type LockedAccountBannerFragment$data = LockedAccountBannerFragment;
export type LockedAccountBannerFragment$key = {
    readonly " $data"?: LockedAccountBannerFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"LockedAccountBannerFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LockedAccountBannerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "LockedAccountModalFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};
(node as any).hash = '25c3493b4bec50a62be404e742515768';
export default node;
