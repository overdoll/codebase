/**
 * @generated SignedSource<<62f17281023491a4f61c9e3e0f468c7c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PreviewPostFragment$data = {
  readonly club: {
    readonly slug: string;
  };
  readonly reference: string;
  readonly " $fragmentSpreads": FragmentRefs<"PreviewContentFragment" | "PreviewFooterFragment" | "PreviewHeaderFragment">;
  readonly " $fragmentType": "PreviewPostFragment";
};
export type PreviewPostFragment$key = {
  readonly " $data"?: PreviewPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PreviewPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PreviewPostFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reference",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Club",
      "kind": "LinkedField",
      "name": "club",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PreviewHeaderFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PreviewContentFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PreviewFooterFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "33372c363bc9c5396860bd304c3cecce";

export default node;
