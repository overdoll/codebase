/**
 * @generated SignedSource<<f5fb61df371eaac535f6a6aec21d4214>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaPublicPostViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContainerPublicPostViewerFragment">;
  readonly " $fragmentType": "MetaPublicPostViewerFragment";
};
export type MetaPublicPostViewerFragment$key = {
  readonly " $data"?: MetaPublicPostViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaPublicPostViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaPublicPostViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerPublicPostViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "c48855d96e844c4fafefc5729a86d134";

export default node;
