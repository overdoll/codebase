/**
 * @generated SignedSource<<d1386617f8200cf15f34f159485c7cf3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type addClubDataJsonLdFragment$data = {
  readonly name: string;
  readonly slug: string;
  readonly thumbnail: {
    readonly urls: ReadonlyArray<{
      readonly url: string;
    }>;
  } | null;
  readonly " $fragmentType": "addClubDataJsonLdFragment";
};
export type addClubDataJsonLdFragment$key = {
  readonly " $data"?: addClubDataJsonLdFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"addClubDataJsonLdFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "addClubDataJsonLdFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
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
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "thumbnail",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ResourceUrl",
          "kind": "LinkedField",
          "name": "urls",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "url",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "8ffa9ae596170416a58f0542bfbd3b6c";

export default node;
