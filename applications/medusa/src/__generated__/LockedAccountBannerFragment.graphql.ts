/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LockedAccountBannerFragment = {
    readonly lock: {
        readonly " $fragmentRefs": FragmentRefs<"LockedAccountModalFragment">;
    } | null;
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
      "alias": null,
      "args": null,
      "concreteType": "AccountLock",
      "kind": "LinkedField",
      "name": "lock",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "LockedAccountModalFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};
(node as any).hash = 'a62581f30edb194a99309413a8ff3a7e';
export default node;
