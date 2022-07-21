/**
 * @generated SignedSource<<178592e2af51101064a153b43e3810dc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostJoinClubViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinConditionWrapperViewerFragment" | "ClubSupportConditionWrapperViewerFragment">;
  readonly " $fragmentType": "PostJoinClubViewerFragment";
};
export type PostJoinClubViewerFragment$key = {
  readonly " $data"?: PostJoinClubViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostJoinClubViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostJoinClubViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubJoinConditionWrapperViewerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubSupportConditionWrapperViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "70d5e5efdb6d061f9bdcbbf9237f261a";

export default node;
