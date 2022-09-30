/**
 * @generated SignedSource<<7d46ad559951782623d74d892a01ea30>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubJoinButtonViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinWrapperViewerFragment">;
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubJoinWrapperViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "145eeba8a8f8f744ab922998630ca068";

export default node;
