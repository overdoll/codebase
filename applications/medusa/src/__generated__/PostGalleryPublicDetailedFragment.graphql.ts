/**
 * @generated SignedSource<<3f9d634730f656a754ae397a2ca25ed4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostGalleryPublicDetailedFragment$data = {
  readonly id: string;
  readonly reference: string;
  readonly content: ReadonlyArray<{
    readonly resource: {
      readonly " $fragmentSpreads": FragmentRefs<"PostMediaFragment">;
    };
  }>;
  readonly " $fragmentType": "PostGalleryPublicDetailedFragment";
};
export type PostGalleryPublicDetailedFragment = PostGalleryPublicDetailedFragment$data;
export type PostGalleryPublicDetailedFragment$key = {
  readonly " $data"?: PostGalleryPublicDetailedFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostGalleryPublicDetailedFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostGalleryPublicDetailedFragment",
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
      "name": "reference",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PostContent",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Resource",
          "kind": "LinkedField",
          "name": "resource",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "PostMediaFragment"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "d763192d275aa2c130dbdb550daf2a35";

export default node;
