/**
 * @generated SignedSource<<d88c8f8d040a509e5439fe875f0dc821>>
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
  readonly " $fragmentSpreads": FragmentRefs<"AdminClubUnSuspendButtonFragment">;
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
      "name": "AdminClubUnSuspendButtonFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "689ef1759520ac0f783bc69774dd5362";

export default node;
