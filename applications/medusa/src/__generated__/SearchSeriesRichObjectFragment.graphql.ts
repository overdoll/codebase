/**
 * @generated SignedSource<<27fb2b81dedb6974367e0f1deb34cac8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchSeriesRichObjectFragment$data = {
  readonly slug: string;
  readonly thumbnail: {
    readonly " $fragmentSpreads": FragmentRefs<"ResourceRichObjectFragment">;
  } | null;
  readonly title: string;
  readonly " $fragmentType": "SearchSeriesRichObjectFragment";
};
export type SearchSeriesRichObjectFragment$key = {
  readonly " $data"?: SearchSeriesRichObjectFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SearchSeriesRichObjectFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SearchSeriesRichObjectFragment",
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
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "thumbnail",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ResourceRichObjectFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Series",
  "abstractKey": null
};

(node as any).hash = "d5b8cbc675da63dc14ebd561a0050763";

export default node;
