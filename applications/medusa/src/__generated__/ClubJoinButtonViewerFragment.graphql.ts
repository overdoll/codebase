/**
 * @generated SignedSource<<331a02a7ebe13a59ade38d30fe79e1a5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubJoinButtonViewerFragment$data = {
  readonly clubMembershipsCount: number;
  readonly clubMembershipsLimit: number;
  readonly " $fragmentType": "ClubJoinButtonViewerFragment";
};
export type ClubJoinButtonViewerFragment$key = {
  readonly " $data"?: ClubJoinButtonViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinButtonViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubJoinButtonViewerFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "clubMembershipsLimit",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "clubMembershipsCount",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "30528aa01b875ace43714572f11fd556";

export default node;
