/**
 * @generated SignedSource<<39216310c80d830a8427622b5d2ee92a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type JoinClubButtonViewerFragment$data = {
  readonly clubMembershipsLimit: number;
  readonly clubMembershipsCount: number;
  readonly " $fragmentType": "JoinClubButtonViewerFragment";
};
export type JoinClubButtonViewerFragment = JoinClubButtonViewerFragment$data;
export type JoinClubButtonViewerFragment$key = {
  readonly " $data"?: JoinClubButtonViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"JoinClubButtonViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JoinClubButtonViewerFragment",
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

(node as any).hash = "30529c7b0eabb5adc6e85910bc63948e";

export default node;
