/**
 * @generated SignedSource<<9fa0f047c4cfbf656ba4e8502b690ffe>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SupportPublicClubViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubSupportPromptViewerFragment" | "ClubSupportSelectMethodViewerFragment">;
  readonly " $fragmentType": "SupportPublicClubViewerFragment";
};
export type SupportPublicClubViewerFragment$key = {
  readonly " $data"?: SupportPublicClubViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SupportPublicClubViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SupportPublicClubViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubSupportSelectMethodViewerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubSupportPromptViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "15f411d6bd62dcd4ecdcb13059db416b";

export default node;
