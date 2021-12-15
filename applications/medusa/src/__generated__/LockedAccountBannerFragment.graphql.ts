/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AccountLockReason = "POST_INFRACTION" | "%future added value";
export type LockedAccountBannerFragment = {
    readonly lock: {
        readonly reason: AccountLockReason;
        readonly expires: unknown;
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "reason",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "expires",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};
(node as any).hash = 'd6303211841753c76aadc1d7b293a5ec';
export default node;
