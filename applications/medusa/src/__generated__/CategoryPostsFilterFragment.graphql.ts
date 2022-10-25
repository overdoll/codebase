/**
 * @generated SignedSource<<11ccb16a254534d82eee8e544eb184d8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CategoryPostsFilterFragment$data = {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly " $fragmentType": "CategoryPostsFilterFragment";
};
export type CategoryPostsFilterFragment$key = {
  readonly " $data"?: CategoryPostsFilterFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CategoryPostsFilterFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CategoryPostsFilterFragment",
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
  "type": "Category",
  "abstractKey": null
};

(node as any).hash = "eebfa1a87edfadd3df053f45cacb8e19";

export default node;
