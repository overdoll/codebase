/**
 * @generated SignedSource<<30b53c80cc0c58d23bd5f695c89086a9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeSeriesThumbnailFormFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "ChangeSeriesThumbnailFormFragment";
};
export type ChangeSeriesThumbnailFormFragment$key = {
  readonly " $data"?: ChangeSeriesThumbnailFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeSeriesThumbnailFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeSeriesThumbnailFormFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Series",
  "abstractKey": null
};

(node as any).hash = "59ec3d3e70f0b0dd8e713599c69013c4";

export default node;