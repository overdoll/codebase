/**
 * @generated SignedSource<<084e5675130e80e3f8c92e2280977453>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchSeriesShareRedditButtonFragment$data = {
  readonly slug: string;
  readonly title: string;
  readonly " $fragmentType": "SearchSeriesShareRedditButtonFragment";
};
export type SearchSeriesShareRedditButtonFragment$key = {
  readonly " $data"?: SearchSeriesShareRedditButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SearchSeriesShareRedditButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SearchSeriesShareRedditButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Series",
  "abstractKey": null
};

(node as any).hash = "859c138fa5237a6cb2554523a7036509";

export default node;
