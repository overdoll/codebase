/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LockedAccountModalFragment = {
    readonly lock: {
        readonly expires: unknown;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"UnlockAccountFormFragment">;
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
      "concreteType": "AccountLock",
      "kind": "LinkedField",
      "name": "lock",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "expires",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UnlockAccountFormFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};
(node as any).hash = '8139d92350ad572a882dd19c7c557183';
export default node;
