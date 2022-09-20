/**
 * @generated SignedSource<<7a476eef4e6770014e6ef05827f0cd86>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClickableCategoryFragment$data = {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly " $fragmentType": "ClickableCategoryFragment";
};
export type ClickableCategoryFragment$key = {
  readonly " $data"?: ClickableCategoryFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClickableCategoryFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClickableCategoryFragment",
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
  "type": "Category",
  "abstractKey": null
};

(node as any).hash = "3238ffaafabaf21cd9e99cfd659686aa";

export default node;
