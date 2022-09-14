/**
 * @generated SignedSource<<90c5c9154c258b5c454dbc9eee292305>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ScrollPublicClubCharacterViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"FullSimplePostViewerFragment">;
  readonly " $fragmentType": "ScrollPublicClubCharacterViewerFragment";
};
export type ScrollPublicClubCharacterViewerFragment$key = {
  readonly " $data"?: ScrollPublicClubCharacterViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ScrollPublicClubCharacterViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ScrollPublicClubCharacterViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FullSimplePostViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "61482db1e24118b178ae9cebc485e980";

export default node;
