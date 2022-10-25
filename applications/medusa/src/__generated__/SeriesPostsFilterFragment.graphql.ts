/**
 * @generated SignedSource<<162c4d859b42d5d18c8d88d0cbf17833>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SeriesPostsFilterFragment$data = {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly " $fragmentType": "SeriesPostsFilterFragment";
};
export type SeriesPostsFilterFragment$key = {
  readonly " $data"?: SeriesPostsFilterFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SeriesPostsFilterFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SeriesPostsFilterFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "Series",
  "abstractKey": null
};

(node as any).hash = "ce736e9ca9a0a3d4a7992db92088eeb9";

export default node;
