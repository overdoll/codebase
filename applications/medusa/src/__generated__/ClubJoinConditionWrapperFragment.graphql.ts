/**
 * @generated SignedSource<<127a9bc7f9b9aa77ebd839ff57757106>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubJoinConditionWrapperFragment$data = {
  readonly viewerIsOwner: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"ClubGuestJoinWrapperFragment" | "ClubJoinWrapperFragment">;
  readonly " $fragmentType": "ClubJoinConditionWrapperFragment";
};
export type ClubJoinConditionWrapperFragment$key = {
  readonly " $data"?: ClubJoinConditionWrapperFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinConditionWrapperFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubJoinConditionWrapperFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "viewerIsOwner",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubJoinWrapperFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubGuestJoinWrapperFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "ba24f0141147833c1d31b786881fd241";

export default node;
