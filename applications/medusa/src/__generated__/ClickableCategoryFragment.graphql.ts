/**
 * @generated SignedSource<<142f8df21c5b14e9a2fd4baef369f2b9>>
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
  readonly thumbnail: {
    readonly preview: string;
  } | null;
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
          "kind": "ScalarField",
          "name": "preview",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Category",
  "abstractKey": null
};

(node as any).hash = "648702e357abb35e3b82c002a6ae2627";

export default node;
