/**
 * @generated SignedSource<<cf2e92de1416c435c023b5ea16a38ae1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PostSlideIndexMediaFragment$data = {
  readonly resource: {
    readonly type: ResourceType;
    readonly " $fragmentSpreads": FragmentRefs<"ImageSnippetFragment" | "VideoSnippetFragment">;
  };
  readonly " $fragmentType": "PostSlideIndexMediaFragment";
};
export type PostSlideIndexMediaFragment$key = {
  readonly " $data"?: PostSlideIndexMediaFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostSlideIndexMediaFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostSlideIndexMediaFragment",
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "type",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ImageSnippetFragment"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "VideoSnippetFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};

(node as any).hash = "ce64ca131e7b404b99faba90842b7629";

export default node;
