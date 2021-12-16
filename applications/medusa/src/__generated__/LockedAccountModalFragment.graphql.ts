/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AccountLockReason = "POST_INFRACTION" | "%future added value";
export type LockedAccountModalFragment = {
    readonly reason: AccountLockReason;
    readonly expires: unknown;
    readonly " $refType": "LockedAccountModalFragment";
};
export type LockedAccountModalFragment$data = LockedAccountModalFragment;
export type LockedAccountModalFragment$key = {
    readonly " $data"?: LockedAccountModalFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"LockedAccountModalFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LockedAccountModalFragment",
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
  "type": "AccountLock",
  "abstractKey": null
};
(node as any).hash = 'b09e76a2450dccbc87864d8e54df398c';
export default node;
