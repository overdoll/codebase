/**
 * @generated SignedSource<<8b7a70b54f89ac6aa7196b9d9c362a64>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchCategoryRichObjectFragment$data = {
  readonly bannerMedia: {
    readonly " $fragmentSpreads": FragmentRefs<"MediaRichObjectFragment">;
  } | null;
  readonly slug: string;
  readonly title: string;
  readonly " $fragmentType": "SearchCategoryRichObjectFragment";
};
export type SearchCategoryRichObjectFragment$key = {
  readonly " $data"?: SearchCategoryRichObjectFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SearchCategoryRichObjectFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SearchCategoryRichObjectFragment",
  "selections": [
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "bannerMedia",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "MediaRichObjectFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Category",
  "abstractKey": null
};

(node as any).hash = "74d526a533bd6533c3b8e1a967da159a";

export default node;
