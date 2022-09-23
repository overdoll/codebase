/**
 * @generated SignedSource<<60d07f709f8266c86c1d5788403e5940>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NewCreatePostClubFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubDraftPostsAlertFragment" | "CreatePostFlowFragment">;
  readonly " $fragmentType": "NewCreatePostClubFragment";
};
export type NewCreatePostClubFragment$key = {
  readonly " $data"?: NewCreatePostClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"NewCreatePostClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NewCreatePostClubFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubDraftPostsAlertFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CreatePostFlowFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "b58b32d3ffae60ed12e5b2cb040bf44b";

export default node;
