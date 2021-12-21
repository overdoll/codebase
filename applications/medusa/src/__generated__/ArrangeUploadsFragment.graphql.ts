/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
export type ArrangeUploadsFragment = {
    readonly content: ReadonlyArray<{
        readonly id: string;
        readonly type: ResourceType;
        readonly urls: ReadonlyArray<{
            readonly url: unknown;
            readonly mimeType: string;
        }>;
    }>;
    readonly " $refType": "ArrangeUploadsFragment";
};
export type ArrangeUploadsFragment$data = ArrangeUploadsFragment;
export type ArrangeUploadsFragment$key = {
    readonly " $data"?: ArrangeUploadsFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArrangeUploadsFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArrangeUploadsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
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
          "name": "type",
          "storageKey": null
        },
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
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "mimeType",
              "storageKey": null
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
(node as any).hash = '40ee6182d4294ee073397c846e9576a4';
export default node;
