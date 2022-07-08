/**
 * @generated SignedSource<<22db5964d0b0988b42faebf5ba40169b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeCategoryThumbnailFragment$data = {
  readonly banner: {
    readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment">;
  } | null;
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeCategoryThumbnailFormFragment">;
  readonly " $fragmentType": "ChangeCategoryThumbnailFragment";
};
export type ChangeCategoryThumbnailFragment$key = {
  readonly " $data"?: ChangeCategoryThumbnailFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeCategoryThumbnailFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeCategoryThumbnailFragment",
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
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "banner",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ResourceIconFragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ChangeCategoryThumbnailFormFragment"
    }
  ],
  "type": "Category",
  "abstractKey": null
};

(node as any).hash = "06c039a94d5a465260c724634cedab87";

export default node;
