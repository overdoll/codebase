/**
 * @generated SignedSource<<48308e94cf1bc68fe1c534ae9703be69>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FullSimplePostViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"JoinClubButtonViewerFragment">;
  readonly " $fragmentType": "FullSimplePostViewerFragment";
};
export type FullSimplePostViewerFragment = FullSimplePostViewerFragment$data;
export type FullSimplePostViewerFragment$key = {
  readonly " $data"?: FullSimplePostViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"FullSimplePostViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FullSimplePostViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "JoinClubButtonViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "35c3abf41b4d3ea739a15ae6e78f0efc";

export default node;
