/**
 * @generated SignedSource<<15b05f43a9dd70979dbad00f3e7c9c17>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SuspendedClubModalFragment$data = {
  readonly suspension: {
    readonly expires: any;
  };
  readonly " $fragmentSpreads": FragmentRefs<"UnSuspendClubFormFragment">;
  readonly " $fragmentType": "SuspendedClubModalFragment";
};
export type SuspendedClubModalFragment$key = {
  readonly " $data"?: SuspendedClubModalFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SuspendedClubModalFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SuspendedClubModalFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UnSuspendClubFormFragment"
    },
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "concreteType": "ClubSuspension",
        "kind": "LinkedField",
        "name": "suspension",
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
      "action": "THROW",
      "path": "suspension"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "7631a0f1e5f879a04bfd4ac6fc5216e8";

export default node;
