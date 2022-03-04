/**
 * @generated SignedSource<<4aa92e0978912d2af4cbf06010aeaa9d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AdminClubStatusFragment$data = {
  readonly suspension: {
    readonly expires: any;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"SuspendClubFormFragment" | "AdminClubUnSuspendButtonFragment">;
  readonly " $fragmentType": "AdminClubStatusFragment";
};
export type AdminClubStatusFragment = AdminClubStatusFragment$data;
export type AdminClubStatusFragment$key = {
  readonly " $data"?: AdminClubStatusFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdminClubStatusFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdminClubStatusFragment",
  "selections": [
    {
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
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SuspendClubFormFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AdminClubUnSuspendButtonFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "ccafb9d0008644f775c2cefb8d3bd079";

export default node;
